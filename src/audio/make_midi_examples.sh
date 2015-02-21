#!/bin/bash

# Generates a collection of samples to use as a sound sample library.
# This script must be in the same folder as generate_midi.py.

INSTRUMENTS="'range(0,128)'"
PITCH='64'
VELOCITY='100'
DURATION='2'
FILESTEM='test'
OUTPUTDIR='midi_sound_examples'

# Change to script directory to make sure we find the other scripts, and 
# remember our location for later.
cd `dirname $0`
CURDIR=`pwd`

# Make sure there isn't stuff in the output folder already.
if [ -d $OUTPUTDIR ] && [ `ls -1 $OUTPUTDIR | wc -l` -gt 0 ]; then
  echo "Output directory $OUTPUTDIR is not empty. Exiting."
  exit
fi

# Generate midi files with python script.
CMD="python generate_midi.py \
--batch_output_stem=$OUTPUTDIR/$FILESTEM \
--pitch=$PITCH \
--velocity=$VELOCITY \
--duration=$DURATION \
--batch_instruments=$INSTRUMENTS"
echo "$CMD"
eval "$CMD"

# Check how many midi files we got.
NUM_MIDI_FILES=`ls -1 $OUTPUTDIR | wc -l`
echo "Generated $NUM_MIDI_FILES midi files."
