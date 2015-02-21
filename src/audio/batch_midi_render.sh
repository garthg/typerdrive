#!/bin/bash

# This script batch-converts midi files to mp3 and ogg files.
# Note that it will output files to the current working directory with names
# that match the input names, irrespective of input paths.

USAGE="Usage: $0 file1.mid file2.mid file3.mid ... fileN.mid"

# Library for FluidSynth to use in midi synthesis.
MIDILIB='/usr/share/sounds/sf2/FluidR3_GM.sf2'

# FFMPEG invocation.
FFMPEG='ffmpeg -loglevel quiet -ab 128k -i'

if [ "$#" == "0" ]; then
  echo "$USAGE"
  exit 1
fi

# Create temporary directory to store intermidate wav files.
TMPDIR=/tmp/batch_midi_render
if [ ! -d $TMPDIR ]; then mkdir -p $TMPDIR; fi

function ffmpeg_if_not_exists {
  if [ ! -f $2 ]; then
    CMD="$FFMPEG $1 $2"
    echo "$CMD"
    eval "$CMD"
  else
    echo "File exists, skipping: $2"
  fi
}

# Process each input file.
while (( "$#" )); do
  # Set up filename.
  FILENAME=$(basename $1)
  STEM="${FILENAME%%.mid}"
  # Render midi to wav.
  CMD="fluidsynth -F $TMPDIR/$STEM.wav $MIDILIB $1"
  echo "$CMD"
  eval "$CMD"
  if [ ! -f "$TMPDIR/$STEM.wav" ]; then
    echo "Error: Could not create wav file for input $1."
  else
    # Convert wav file to mp3 and ogg.
    ffmpeg_if_not_exists $TMPDIR/$STEM.wav $PWD/$STEM.mp3
    ffmpeg_if_not_exists $TMPDIR/$STEM.wav $PWD/$STEM.m4a
    mv $PWD/$STEM.m4a $PWD/$STEM.mp4
    if [ ! -f "$PWD/$STEM.ogg" ]; then
      oggenc -q 6 $TMPDIR/$STEM.wav -o $PWD/$STEM.ogg
    fi
    #CMD="$FFMPEG $TMPDIR/$STEM.wav $PWD/$STEM.m4a"
    #echo "$CMD"
    #eval "$CMD"
    #CMD="$FFMPEG $TMPDIR/$STEM.wav $PWD/$STEM.ogg"
    #echo "$CMD"
    #eval "$CMD"
    if [ ! -f "$PWD/$STEM.mp4" ] || [ ! -f "$PWD/$STEM.mp3" ] || [ ! -f "$PWD/$STEM.ogg" ]; then
      echo "Failed to convert $1. Intermediate files can be found in $TMPDIR".
    else
      # Cleanup.
      rm $TMPDIR/$STEM.wav
    fi
  fi
  shift
done

# Cleanup.
if [[ $(ls "$TMPDIR") == "" ]]; then rmdir $TMPDIR; fi
