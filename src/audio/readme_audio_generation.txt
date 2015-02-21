For generating sounds:

Audio collections:
Files in 'generated_audio' generated with 'make_all_audio.sh'.
Files in 'midi_sound_examples' generated with 'make_midi_examples.sh'.

=== Generate midi file.
Write csv from python script.
>$ cat input.csv | csvtomidi > midifile.mid
http://www.fourmilab.ch/webtools/midicsv/
(Also kept a copy in this folder.)
Partial list of working instrument codes:
1   Piano
2   Piano
4   Vibes
5   Vibes
6   Harpsichord
7   Clavichord
8   Vibes
9   Vibes
13  Marimba
14  Gong
19  Organ
21  Sax
24  Guitar
29  Guitar distorted
35  Bass
40  Violin
53  Choir 'doo'
56  Brass
79  Sine wave synth lead
80  Distorted synth lead
84  Harsher synth lead
88  Bell synth lead
94  Pad sweep
95  Pad sweep


=== Convert midi to wav.
Use fluidsynth (install via apt-get).
>$ fluidsynth -F wavfile.wav /usr/share/sounds/sf2/FluidR3_GM.sf2 midifile.mid
The .sf2 argument is the General Midi library. Other soundfonts can be
substituted here in its place.


=== Convert wav to mp3/ogg.
Use ffmpeg (install via apt-get, also need other packages for mp3 libs).
>$ ffmpeg -i wavfile.wav mp3file.mp3
>$ ffmpeg -i wavfile.wav m4afile.m4a
>$ oggenc -q 6 wavfile.wav -o oggfile.ogg

