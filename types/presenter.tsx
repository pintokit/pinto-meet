import { useState } from 'react'
import Disconnect from '../public/disconnect'
import Mute from '../public/mute'
import Share from '../public/share'
import UnShare from '../public/un-share'
import UnMute from '../public/unmute'
import styles from '../styles/Presenter.module.css'
import Video from '../types/video'

const Presenter = (props: { stream: MediaStream, disconnect: () => void }) => {
  const [micActivated, setMicActivated] = useState<boolean>(true)
  const [screenCaptureActivated, setScreenCapture] = useState<boolean>(false)

  let muteButton: JSX.IntrinsicElements['button'] // eslint-disable-line no-undef
  let shareButton: JSX.IntrinsicElements['button'] // eslint-disable-line no-undef

  const activateMicrophone = () => {
    setMicActivated(true)
    const audioTracks = props.stream.getAudioTracks()
    audioTracks.forEach((track) => {
      track.enabled = true
    })
  }

  const deactivateMicrophone = () => {
    setMicActivated(false)
    const audioTracks = props.stream.getAudioTracks()
    audioTracks.forEach((track) => {
      track.enabled = false
    })
  }

  const startScreenCapture = () => { setScreenCapture(true) }

  const endScreenCapture = () => { setScreenCapture(false) }

  if (micActivated) {
    muteButton = <button onClick={deactivateMicrophone}><Mute/></button>
  } else {
    muteButton = <button onClick={activateMicrophone}><UnMute/></button>
  }

  if (screenCaptureActivated) {
    shareButton = <button disabled={true} onClick={endScreenCapture}><UnShare/></button>
  } else {
    shareButton = <button disabled={true} onClick={startScreenCapture}><Share/></button>
  }

  return (
    <div className={styles.presenterContainer}>
      <span id={styles.presenterWrapper}>
        <Video stream={props.stream} muted={true}/>
        <span id={styles.controlsWrapper}>
          <div className={styles.controlsContainer}>
            {muteButton}
            {shareButton}
            <button onClick={props.disconnect}><Disconnect/></button>
          </div>
        </span>
      </span>
    </div>
  )
}

export default Presenter
