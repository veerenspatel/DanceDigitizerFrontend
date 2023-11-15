from flask import Flask, request, jsonify
import tempfile
import os
import librosa
from moviepy.editor import VideoFileClip
import shutil
# from madmom.features import beats

app = Flask(__name__)

@app.route('/process_mp3', methods=['POST'])
def process_mp3():
    try:
        # Check if a file named 'mp3_file' is included in the POST request
        if 'video' not in request.files:
            return jsonify({'error': 'No MP4 file part'})

        
        mp4_file = request.files['video']

        timestamp = request.form['startingStamp']
        print(timestamp)

        #create a temp directory and save mp4 to it
        tmp_dir = tempfile.mkdtemp()
        mp4_file_path = os.path.join(tmp_dir, 'mp4_file.mp4')
        mp4_file.save(mp4_file_path)
        
        # Check if the file has an allowed extension (e.g., .mp3)
        if mp4_file.filename == '':
            return jsonify({'error': 'No selected MP3 file'})

        if mp4_file:
            mp3Path = convertToMp3(mp4_file_path)

            # Process the MP3 file
            result = process_mp3_file(mp3Path)

            # Remove the temporary directory and its contents
            shutil.rmtree(tmp_dir)

            # Return the result as JSON
            updated = remove_values_below_threshold(result, float(timestamp))
            return jsonify({'result': updated})

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)})

def remove_values_below_threshold(arr,threshold):
    filtered_arr = [value for value in arr if value >= threshold]
    return filtered_arr

def convertToMp3(mp4_file_path):

    # Output MP3 file path
    output_file_path = os.path.join(os.path.dirname(mp4_file_path), 'mp3_file.mp3')

    # Load the video file
    video_clip = VideoFileClip(mp4_file_path)

    # Extract audio from the video clip
    audio_clip = video_clip.audio

    # Write the audio to an MP3 file
    audio_clip.write_audiofile(output_file_path)

    # Close the audio and video clips
    audio_clip.close()
    video_clip.close()
    return output_file_path

def process_mp3_file(mp3_file_path):


    y,sr = librosa.load(mp3_file_path)
    tempo, beat_frames = librosa.beat.beat_track(y=y, sr=sr)
    print('Estimated tempo: {:.2f} beats per minute'.format(tempo))
    beat_times = librosa.frames_to_time(beat_frames,sr=sr)
  
    return beat_times.tolist()

if __name__ == '__main__':
    app.run()
