import cv2
import os
import sys

def process_all_frames():
    video_path = os.path.abspath("public/videos/hero-background.mp4")
    out_dir = os.path.abspath("public/frames")
    os.makedirs(out_dir, exist_ok=True)

    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(f"Error opening video: {video_path}")
        sys.exit(1)

    total_video_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    TARGET_FRAMES = 120

    # Evenly space 120 frames across the video duration
    indices = [int(i * (total_video_frames - 1) / (TARGET_FRAMES - 1)) for i in range(TARGET_FRAMES)]
    target_set = set(indices)
    target_map = {idx: [] for idx in target_set}
    for out_idx, src_idx in enumerate(indices):
        target_map[src_idx].append(out_idx + 1)

    print(f"Applying Test_4 Unsharp Mask (USM 1.45 / -0.45, Q:98) to all {TARGET_FRAMES} frames...")

    current_idx = 0
    saved_count = 0
    encode_params = [cv2.IMWRITE_WEBP_QUALITY, 98]

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        if current_idx in target_map:
            # Test_4 Sharpening Formula:
            # High-precision Unsharp Mask with Gaussian edge extraction
            gaussian = cv2.GaussianBlur(frame, (0, 0), sigmaX=1.5, sigmaY=1.5)
            sharpened = cv2.addWeighted(frame, 1.45, gaussian, -0.45, 0)

            for out_num in target_map[current_idx]:
                dest_path = os.path.join(out_dir, f"frame_{out_num:03d}.webp")
                cv2.imwrite(dest_path, sharpened, encode_params)
                saved_count += 1
                if saved_count % 15 == 0 or saved_count == TARGET_FRAMES:
                    print(f"Progress: {saved_count}/{TARGET_FRAMES} frames sharpened and saved ({saved_count*100//TARGET_FRAMES}%)")

        current_idx += 1
        if saved_count >= TARGET_FRAMES:
            break

    cap.release()
    print("Done! All 120 frames updated with Test_4 sharpness.")

if __name__ == "__main__":
    process_all_frames()
