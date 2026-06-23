# LiveKit FastAPI Platform

## Overview

A real-time video conferencing platform built using FastAPI, React, and LiveKit.

The platform provides secure room creation, token generation, participant management, audio/video streaming, and chat functionality.

## Features

### Video Conferencing
- HD Video Streaming
- Audio Streaming
- Screen Sharing
- Participant Management

### Chat
- Real-time Messaging
- Data Channel Communication

### Security
- JWT-based Room Access
- Role-based Permissions
- Secure Token Generation

### User Roles
- Host
- Participant
- Viewer

## Architecture

![LiveKit Architecture](docs/livekit_architecture.png)

## Tech Stack

### Backend
- Python
- FastAPI
- LiveKit Server SDK

### Frontend
- React
- LiveKit Client SDK

### Infrastructure
- Docker
- LiveKit Cloud

## System Design

The application follows a token-based architecture.

Users request a room token from the FastAPI backend.

The backend validates the user and generates a secure LiveKit access token.

The frontend uses the token to connect directly to the LiveKit server.

## Flow

Frontend
    |
Request Token
    |
FastAPI Backend
    |
Generate LiveKit Token
    |
LiveKit Cloud
    |
Join Room

## API Endpoints

### Generate Room Token

```http
GET /get-token
```

Parameters:

```json
{
  "identity": "user1",
  "room": "demo-room"
}
```

Response:

```json
{
  "token": "..."
}
```

## Challenges Solved

- Token Authentication
- Room Authorization
- Real-time Messaging
- Audio/Video Synchronization
- Connection Recovery
- WebSocket Event Handling

## Future Enhancements

- Meeting Recording
- Waiting Room
- AI Meeting Assistant
- Live Transcription
- Meeting Analytics

## Author

Saroni
