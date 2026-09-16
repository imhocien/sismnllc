import cv2
import numpy as np
import os

def test_sharpening():
    cap = cv2.VideoCapture("public/videos/hero-background.mp4")
    # Seek to frame 10 (good detail with crane and building)
    cap.set(cv2.CAP_PROP_POS_FRAMES, 10)
    ret, frame = cap.read()
    cap.release()

    if not ret:
        print("Failed to read frame")
        return

    # 1. Raw original frame saved as lossless PNG
    cv2.imwrite("test_1_raw.png", frame)

    # 2. Current WebP (Q:94) without sharpening
    cv2.imwrite("test_2_current_q94.webp", frame, [cv2.IMWRITE_WEBP_QUALITY, 94])

    # 3. High-quality WebP (Q:98)
    cv2.imwrite("test_3_q98.webp", frame, [cv2.IMWRITE_WEBP_QUALITY, 98])

    # 4. Professional Unsharp Mask (USM):
    # Gaussian blur subtracted from original to isolate high-frequency edges, then weighted add
    gaussian = cv2.GaussianBlur(frame, (0, 0), sigmaX=1.5, sigmaY=1.5)
    # unsharp_mask = cv2.addWeighted(frame, 1.5, gaussian, -0.5, 0)
    sharpened_1 = cv2.addWeighted(frame, 1.45, gaussian, -0.45, 0)
    cv2.imwrite("test_4_sharpened_moderate.webp", sharpened_1, [cv2.IMWRITE_WEBP_QUALITY, 98])

    # 5. Detail enhancement + subtle micro-contrast
    # Using kernel sharpening
    kernel = np.array([
        [ 0, -0.5,  0],
        [-0.5,  3.0, -0.5],
        [ 0, -0.5,  0]
    ], dtype=np.float32)
    sharpened_kernel = cv2.filter2D(frame, -1, kernel)
    cv2.imwrite("test_5_sharpened_kernel.webp", sharpened_kernel, [cv2.IMWRITE_WEBP_QUALITY, 98])

    # 6. CLAHE (Contrast Limited Adaptive Histogram Equalization) on Luminance channel + Unsharp Mask
    lab = cv2.cvtColor(frame, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    clahe = cv2.createCLAHE(clipLimit=1.8, tileGridSize=(8, 8))
    l_clahe = clahe.apply(l)
    lab_clahe = cv2.merge((l_clahe, a, b))
    contrast_enhanced = cv2.cvtColor(lab_clahe, cv2.COLOR_LAB2BGR)
    
    # Apply USM to contrast enhanced
    gauss_ce = cv2.GaussianBlur(contrast_enhanced, (0, 0), sigmaX=1.2, sigmaY=1.2)
    final_crisp = cv2.addWeighted(contrast_enhanced, 1.4, gauss_ce, -0.4, 0)
    cv2.imwrite("test_6_crisp_ultra.webp", final_crisp, [cv2.IMWRITE_WEBP_QUALITY, 98])

    print("Test images generated:")
    for f in ["test_1_raw.png", "test_2_current_q94.webp", "test_3_q98.webp", "test_4_sharpened_moderate.webp", "test_5_sharpened_kernel.webp", "test_6_crisp_ultra.webp"]:
        size_kb = os.path.getsize(f) / 1024
        print(f"  {f}: {size_kb:.1f} KB")

if __name__ == "__main__":
    test_sharpening()
