import React, { useState, useEffect } from 'react';
import {
  LiveKitRoom,
  VideoConference,
  GridLayout,
  ParticipantTile,
  RoomAudioRenderer,
  ControlBar,
  useTracks,
} from '@livekit/components-react';
import { Track, Room } from 'livekit-client';
import '@livekit/components-styles';
import { FiMic, FiMicOff, FiVideo, FiVideoOff } from 'react-icons/fi';
import { PiHandFist } from 'react-icons/pi';

type ClassRoomProps = {
  roomName: string;
  userName: string;
  token: string;
  serverUrl: string;
};

function ClassRoom({ roomName, userName, token, serverUrl }: ClassRoomProps) {
  const [room] = useState(
    () =>
      new Room({
        adaptiveStream: true,
        dynacast: true,
        videoCaptureDefaults: {
          resolution: {
            width: 1280,
            height: 720,
            frameRate: 30,
          },
        },
      })
  );
  const [handRaised, setHandRaised] = useState(false);
  const [canSpeak, setCanSpeak] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoOff, setIsVideoOff] = useState(true);

  useEffect(() => {
    // Listen for permissions from teacher
    const handleDataReceived = (payload: Uint8Array, participant?: any) => {
      const decoder = new TextDecoder();
      const message = JSON.parse(decoder.decode(payload));
      
      if (message.type === 'SPEAK_PERMISSION' && message.studentId === userName) {
        setCanSpeak(message.allowed);
        if (!message.allowed) {
          // Mute if permission revoked
          setIsMuted(true);
        }
      }
    };

    room.on('dataReceived', handleDataReceived);

    return () => {
      room.off('dataReceived', handleDataReceived);
    };
  }, [room, userName]);

  const handleRaiseHand = async () => {
    if (!room.localParticipant) return;

    const newState = !handRaised;
    setHandRaised(newState);

    // Send hand raise signal to teacher
    const encoder = new TextEncoder();
    const data = encoder.encode(
      JSON.stringify({
        type: 'HAND_RAISED',
        studentId: userName,
        raised: newState,
      })
    );

    await room.localParticipant.publishData(data, { reliable: true });
  };

  const handleToggleMic = async () => {
    if (!canSpeak) {
      alert('You need permission from the teacher to speak');
      return;
    }

    const newState = !isMuted;
    setIsMuted(newState);

    if (room.localParticipant) {
      await room.localParticipant.setMicrophoneEnabled(!newState);
    }
  };

  const handleToggleVideo = async () => {
    const newState = !isVideoOff;
    setIsVideoOff(newState);

    if (room.localParticipant) {
      await room.localParticipant.setCameraEnabled(!newState);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-900">
      <LiveKitRoom
        video={false}
        audio={false}
        token={token}
        serverUrl={serverUrl}
        data-lk-theme="default"
        className="flex-1"
        room={room}
      >
        {/* Main Video Area */}
        <div className="flex-1 relative">
          <VideoConference />
        </div>

        {/* Custom Controls */}
        <div className="bg-gray-800 p-4 border-t border-gray-700">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleToggleMic}
              disabled={!canSpeak}
              className={`p-4 rounded-full transition ${
                canSpeak
                  ? isMuted
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-green-500 hover:bg-green-600'
                  : 'bg-gray-600 cursor-not-allowed'
              } text-white`}
              title={canSpeak ? 'Toggle Microphone' : 'Need permission to speak'}
            >
              {isMuted ? <FiMicOff size={24} /> : <FiMic size={24} />}
            </button>

            <button
              onClick={handleToggleVideo}
              className={`p-4 rounded-full transition ${
                isVideoOff
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-green-500 hover:bg-green-600'
              } text-white`}
              title="Toggle Camera"
            >
              {isVideoOff ? <FiVideoOff size={24} /> : <FiVideo size={24} />}
            </button>

            <button
              onClick={handleRaiseHand}
              className={`p-4 rounded-full transition ${
                handRaised
                  ? 'bg-yellow-500 hover:bg-yellow-600 animate-pulse'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white`}
              title="Raise Hand"
            >
              <PiHandFist size={24} />
            </button>
          </div>

          <div className="mt-3 text-center">
            {!canSpeak && (
              <p className="text-sm text-yellow-400">
                🔒 Raise your hand to request permission to speak
              </p>
            )}
            {canSpeak && (
              <p className="text-sm text-green-400">
                ✓ You have permission to speak
              </p>
            )}
            {handRaised && (
              <p className="text-sm text-yellow-400">
                ✋ Hand raised - waiting for teacher
              </p>
            )}
          </div>
        </div>

        {/* Audio renderer for remote participants */}
        <RoomAudioRenderer />
      </LiveKitRoom>
    </div>
  );
}

export default ClassRoom;
