#!/bin/bash

# Generates a collection of samples to use as a sound sample library.
# This script must be in the same folder as generate_midi.py and
# batch_midi_render.sh.

PITCHES="'range(0,128)'"
VELOCITY='100'
INSTRUMENT='80'  # Distorted synth lead.
DURATION='32'  # Make really long for the sample.
FILESTEM='sample'
OUTPUTDIR='generated_audio'

# Change to script directory to make sure we find the other scripts, and 
# remember our location for later.
cd `dirname $0`
CURDIR=`pwd`

# Make sure there isn't stuff in the output folder already.
#if [ -d $OUTPUTDIR ] && [ `ls -1 $OUTPUTDIR | wc -l` -gt 0 ]; then
#  echo "Output directory $OUTPUTDIR is not empty. Exiting."
#  exit
#fi

# Generate midi files with python script.
TMPDIR="/tmp/make_all_audio_midi_`date +%s`"
CMD="python generate_midi.py \
--batch_output_stem=$TMPDIR/$FILESTEM \
--batch_pitches=$PITCHES \
--velocity=$VELOCITY \
--duration=$DURATION \
--instrument=$INSTRUMENT"
echo "$CMD"
eval "$CMD"

# Check how many midi files we got.
NUM_MIDI_FILES=`ls -1 $TMPDIR | wc -l`
echo "Generated $NUM_MIDI_FILES midi files."

# Render all midi files to audio files.
if [ ! -d $OUTPUTDIR ]; then mkdir -p $OUTPUTDIR; fi
cd $OUTPUTDIR
CMD="bash $CURDIR/batch_midi_render.sh $TMPDIR/$FILESTEM*.mid"
echo "$CMD"
eval "$CMD"

# Compare the number of midi files and audio files, and only delete midi files
# if we got the expected number of audio files.
EXPECTED_AUDIO_FILES=$((NUM_MIDI_FILES * 3))
NUM_AUDIO_FILES=`ls -1 | wc -l`
echo "Midi files converted to $NUM_AUDIO_FILES audio files."
if [ ! $NUM_AUDIO_FILES -eq $EXPECTED_AUDIO_FILES ]; then
  echo "Expected $EXPECTED_AUDIO_FILES audio files! Midi files are in $TMPDIR."
else
  rm -fr $TMPDIR
fi
