/// <reference types="@testing-library/jest-dom" />
/// <reference types="jest" />
import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import ClassRoom from './ClassRoom';

jest.useFakeTimers();

type Listener = (...args: any[]) => void;

class MockRoom {
  listeners: Record<string, Listener[]> = {};
  localParticipant = {
    publishData: jest.fn(),
    setMicrophoneEnabled: jest.fn(),
    setCameraEnabled: jest.fn(),
  };

  on = (event: string, cb: Listener) => {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(cb);
  };

  off = (event: string, cb: Listener) => {
    this.listeners[event] = (this.listeners[event] || []).filter((fn) => fn !== cb);
  };

  emit = (event: string, ...args: any[]) => {
    (this.listeners[event] || []).forEach((fn) => fn(...args));
  };
}

let lastRoom: MockRoom | undefined;
const RoomMock = jest.fn(() => {
  lastRoom = new MockRoom();
  return lastRoom;
});

jest.mock('livekit-client', () => ({
  Room: RoomMock,
  Track: {},
}));

jest.mock('@livekit/components-react', () => ({
  LiveKitRoom: ({ children }: { children: React.ReactNode }) => <div data-testid="livekit-room">{children}</div>,
  VideoConference: () => <div data-testid="video-conference" />,
  GridLayout: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  ParticipantTile: () => <div />,
  RoomAudioRenderer: () => <div data-testid="room-audio-renderer" />,
  ControlBar: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

type Props = React.ComponentProps<typeof ClassRoom>;

const baseProps: Props = {
  roomName: 'test-room',
  userName: 'alice',
  token: 'token',
  serverUrl: 'wss://example.com',
};

describe('ClassRoom', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    lastRoom = undefined;
  });

  it('shows a notice when microphone is toggled without permission', () => {
    render(<ClassRoom {...baseProps} />);

    const micButton = screen.getByLabelText(/microphone/i);
    act(() => {
      fireEvent.click(micButton);
    });

    expect(screen.getByText(/permission from the teacher/i)).toBeTruthy();
  });

  it('enables microphone after teacher permission is granted', () => {
    render(<ClassRoom {...baseProps} />);
    const room = lastRoom!;

    act(() => {
      const payload = new TextEncoder().encode(
        JSON.stringify({ type: 'SPEAK_PERMISSION', studentId: 'alice', allowed: true })
      );
      room.emit('dataReceived', payload);
    });

    const micButton = screen.getByLabelText(/microphone/i);

    act(() => {
      fireEvent.click(micButton);
    });

    expect(room.localParticipant.setMicrophoneEnabled).toHaveBeenCalledWith(true);
    expect(screen.getByText(/granted you permission/i)).toBeTruthy();
  });
});
