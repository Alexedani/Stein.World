from PIL import Image
import os


def wipe_images(directory):
    for filename in os.listdir(directory):
        # Check if the file is an image
        if filename.endswith(".jpg") or filename.endswith(".png") or filename.endswith(".jpeg"):
            # Open the image
            img_path = os.path.join(directory, filename)
            img = Image.open(img_path)

            # Create a blank image with the same size and mode as the original image
            blank_img = Image.new("RGBA", img.size, (0, 0, 0, 0))

            # Save the blank image with the same filename
            blank_img.save(img_path)
            print(f"Blanked image: {filename}")


if __name__ == "__main__":
    directory = os.getcwd()  # Get the current working directory
    wipe_images(directory)