import cv2
import os
import sys
import shutil

def main():
    video_path = r"C:\Users\Shahid\Downloads\new-video.mp4"
    project_frames_dir = os.path.abspath("public/frames")
    backup_dir = os.path.abspath("public/frames_prev_backup")
    downloads_out_dir = r"C:\Users\Shahid\Downloads\new-video-frames"

    if not os.path.isfile(video_path):
        print(f"Error: Video file not found at {video_path}")
        sys.exit(1)

    # 1. Backup existing frames if backup doesn't already exist
    if os.path.isdir(project_frames_dir) and not os.path.exists(backup_dir):
        print(f"Backing up current frames to {backup_dir}...")
        shutil.copytree(project_frames_dir, backup_dir)

    os.makedirs(project_frames_dir, exist_ok=True)
    os.makedirs(downloads_out_dir, exist_ok=True)

    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(f"Error: Could not open video {video_path}")
        sys.exit(1)

    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    duration = total_frames / fps if fps > 0 else 0

    print(f"Loaded: {width}x{height}, {fps:.2f} fps, {total_frames} total frames, {duration:.2f}s")

    TARGET_COUNT = 120
    # Evenly space 120 indices across total frames [0 ... total_frames - 1]
    indices = [int(i * (total_frames - 1) / (TARGET_COUNT - 1)) for i in range(TARGET_COUNT)]

    target_set = set(indices)
    target_map = {}
    for out_idx, src_idx in enumerate(indices):
        if src_idx not in target_map:
            target_map[src_idx] = []
        target_map[src_idx].append(out_idx + 1)

    encode_params = [cv2.IMWRITE_WEBP_QUALITY, 95]

    current_frame = 0
    saved = 0

    print(f"Extracting {TARGET_COUNT} frames to WebP format...")

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        if current_frame in target_map:
            for out_num in target_map[current_frame]:
                filename = f"frame_{out_num:03d}.webp"
                # Save to public/frames
                dest_project = os.path.join(project_frames_dir, filename)
                cv2.imwrite(dest_project, frame, encode_params)
                
                # Also save to Downloads/new-video-frames
                dest_downloads = os.path.join(downloads_out_dir, filename)
                cv2.imwrite(dest_downloads, frame, encode_params)

                saved += 1
                if saved % 15 == 0 or saved == TARGET_COUNT:
                    print(f"Progress: {saved}/{TARGET_COUNT} frames saved ({saved*100//TARGET_COUNT}%)")

        current_frame += 1
        if saved >= TARGET_COUNT:
            break

    cap.release()
    print(f"\nSuccessfully extracted all {TARGET_COUNT} frames!")
    print(f"1. Project frames: {project_frames_dir}")
    print(f"2. Downloads output: {downloads_out_dir}")

if __name__ == "__main__":
    main()
