const screenshotBtn = document.querySelector('.btn-screenshot')
const screenPreview = document.querySelector('.screenshot-preview')
const closeBtn = document.querySelector('.btn-close')

const capturescreen = async function () {
  try {
    // Seeking permission to use a media input to record current screen
    const stream = await navigator.mediaDevices.getDisplayMedia({
      preferCurrentTab: true,
    })
    const video = document.createElement('video')
    video.srcObject = stream //passing captured stream data as video source object

    video.addEventListener('loadedmetadata', function () {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')

      // passing video width and height as canvas weight and height
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      video.play() // playing the video to prevent the drawn image from being black or blank

      // drawing an img on canvas from the captured video stream
      context.drawImage(video, 0, 0, canvas.width, canvas.height)
      stream.getVideoTracks()[0].stop() // stop recording once the image is drawn

      // passing canvas data url as screenshot img src
      screenPreview.querySelector('img').src = canvas.toDataURL()
      screenPreview.classList.add('show')
    })
  } catch (error) {
    alert('Failed to capture screenshot!')
  }
}
closeBtn.addEventListener('click', () => screenPreview.classList.remove('show'))
// screenPreview.addEventListener('click', () =>
//   screenPreview.classList.remove('show')
// )
screenshotBtn.addEventListener('click', capturescreen)
