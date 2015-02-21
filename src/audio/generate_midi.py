import sys
import gflags
import logging
import csvmidi
import subprocess
import os


'''
Generates a midi file containing a single note.

Example usage: generate_midi.py --pitch=60 --output test.mid

Requires that csvmidi be installed. Available from
<http://www.fourmilab.ch/webtools/midicsv/>.
'''


FLAGS = gflags.FLAGS

gflags.ADOPT_module_key_flags(csvmidi)

gflags.DEFINE_string('batch_pitches', None, 
    'Python string of all pitches to output in batch mode.')
gflags.DEFINE_string('batch_instruments', None,
    'Python string of all instruments to output in batch mode.')
gflags.DEFINE_string('batch_velocities', None,
    'Python string of all velocities to output in batch mode.')
gflags.DEFINE_string('batch_durations', None,
    'Python string of all durations to output in batch mode.')
gflags.DEFINE_string('batch_output_stem', None,
    'Filename stem for batch mode.')


def generate_midi_data(bpm, instrument, pitch, velocity, duration):
  csv_data = csvmidi.generate_midi_csv(bpm, instrument, pitch,
      velocity, duration)
  process = subprocess.Popen('csvmidi', stdin=subprocess.PIPE,
      stdout=subprocess.PIPE)
  result = process.communicate(csv_data)
  if result[1]:
    logging.error('Call to csvmidi resulted in error: %s' % result[1])
  return result[0]

def run():
  if (FLAGS.batch_output_stem):
    logging.info('Running in batch mode.')
    output_dir = os.path.dirname(FLAGS.batch_output_stem)
    if not os.path.isdir(output_dir): os.makedirs(output_dir)
    pitches = (eval(FLAGS.batch_pitches) if FLAGS.batch_pitches
        else [FLAGS.pitch])
    instruments = (eval(FLAGS.batch_instruments) if FLAGS.batch_instruments
        else [FLAGS.instrument])
    velocities = (eval(FLAGS.batch_velocities) if FLAGS.batch_velocities
        else [FLAGS.velocity])
    durations = (eval(FLAGS.batch_durations) if FLAGS.batch_durations
        else [FLAGS.duration])
    # Could add other batch flags.
    for pitch in pitches:
      for instrument in instruments:
        for velocity in velocities:
          for duration in durations:
            data = generate_midi_data(FLAGS.bpm, instrument, pitch,
                velocity, duration)
            outvars = [
              ('ins'+str(instrument) if (len(instruments) > 1) else None),
              ('pit'+str(pitch)      if (len(pitches) > 1)     else None),
              ('vel'+str(velocity)   if (len(velocities) > 1)  else None),
              ('dur'+str(duration)   if (len(durations) > 1)   else None),
              ]
            outname = (FLAGS.batch_output_stem + '_' +
                '_'.join([x for x in outvars if x]) + '.mid')
            with open(outname, 'wb') as fp:
              fp.write(data)
  else:
    data = generate_midi_data(
        FLAGS.bpm,
        FLAGS.instrument,
        FLAGS.pitch,
        FLAGS.velocity,
        FLAGS.duration)
    with open(FLAGS.output, 'wb') as fp:
      fp.write(data)

if __name__ == '__main__':
  sys.argv = FLAGS(sys.argv)
  # TODO check flags.
  logging.basicConfig(level=eval('logging.'+FLAGS.loglevel))
  run()
