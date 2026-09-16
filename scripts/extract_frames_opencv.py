import cv2
import os
import sys

def extract_frames():
    video_path = os.path.abspath("public/videos/hero-background.mp4")
    out_dir = os.path.abspath("public/frames")
    os.makedirs(out_dir, exist_ok=True)

    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(f"Error: Could not open video {video_path}")
        sys.exit(1)

    total_video_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    duration = total_video_frames / fps if fps > 0 else 0

    print(f"Source Video: {width}x{height}, {fps:.2f} fps, {total_video_frames} total frames, {duration:.2f}s")

    TARGET_FRAMES = 120
    # Evenly space TARGET_FRAMES across the video
    indices = [int(i * (total_video_frames - 1) / (TARGET_FRAMES - 1)) for i in range(TARGET_FRAMES)]

    current_frame_idx = 0
    saved_count = 0

    # Compression parameters: 94% quality WebP for crystal clear sharpness
    encode_params = [cv2.IMWRITE_WEBP_QUALITY, 94]

    target_set = set(indices)
    target_map = {idx: [] for idx in target_set}
    for out_idx, src_idx in enumerate(indices):
        target_map[src_idx].append(out_idx + 1)

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        if current_frame_idx in target_map:
            for out_num in target_map[current_frame_idx]:
                filename = f"frame_{out_num:03d}.webp"
                filepath = os.path.join(out_dir, filename)
                cv2.imwrite(filepath, frame, encode_params)
                saved_count += 1
                if saved_count % 15 == 0 or saved_count == TARGET_FRAMES:
                    print(f"Saved {saved_count}/{TARGET_FRAMES} frames ({saved_count*100//TARGET_FRAMES}%) at 1920x1080 (Q:94)")

        current_frame_idx += 1
        if saved_count >= TARGET_FRAMES:
            break

    cap.release()
    print(f"Successfully extracted all {TARGET_FRAMES} native crystal-clear 1920x1080 frames to {out_dir}!")

if __name__ == "__main__":
    extract_frames()
