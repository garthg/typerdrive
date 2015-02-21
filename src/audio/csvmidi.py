import sys
import gflags
import logging

'''
Generates a csfile suitable for csvmidi containing a single midi note.
'''


FLAGS = gflags.FLAGS

gflags.DEFINE_string('loglevel', 'WARNING', 'Logging level.')
gflags.DEFINE_string('output', None, 'Output file (defaults to stdout).')
gflags.DEFINE_integer('bpm', 120, 'Tempo in beats per minute.')
gflags.DEFINE_integer('instrument', 0, 'Instrument to play.')
gflags.DEFINE_integer('pitch', 60, 'Pitch to play')
gflags.DEFINE_integer('velocity', 81, 'Velocity of onset.')
gflags.DEFINE_integer('duration', 4, 'Duration of note in beats.')


def _csv_header(tempo, ticks_per_crotchet):
  output = [
      ('0, 0, Header, 1, 2, %d' % ticks_per_crotchet),
      '1, 0, Start_track',
      ('1, 0, Tempo, %d' % tempo),
      '1, 0, End_track',
      ]
  return output

def _csv_body(instrument, pitch, velocity, duration):
  output = [
      '2, 0, Start_track',
      ('2, 0, Program_c, 1, %d' % instrument),
      ('2, 0, Note_on_c, 1, %d, %d' % (pitch, velocity)),
      ('2, %d, Note_off_c, 1, %d, 0' % (duration, pitch)),
      ('2, %d, End_track' % (duration)),
      ]
  return output

def _csv_footer():
  return ['0, 0, End_of_file', '']

def generate_midi_csv(tempo, instrument, pitch, velocity, duration):
  ticks = 480
  data = []
  data.extend(_csv_header(round(60000000/tempo), ticks))
  data.extend(_csv_body(instrument, pitch, velocity, round(ticks*duration)))
  data.extend(_csv_footer())
  return '\n'.join(data)

def run():
  data = generate_midi_csv(
      FLAGS.bpm,
      FLAGS.instrument,
      FLAGS.pitch,
      FLAGS.velocity,
      FLAGS.duration)
  if FLAGS.output:
    with open(FLAGS.output, 'w') as fp:
      fp.write(data)
  else:
    sys.stdout.write(data)

if __name__ == '__main__':
  sys.argv = FLAGS(sys.argv)
  logging.basicConfig(level=eval('logging.'+FLAGS.loglevel))
  run()
