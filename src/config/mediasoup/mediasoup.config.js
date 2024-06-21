const mediasoupConfig = Object.freeze({
  worker: {
    logLevel: "debug",
    logTags: ["info", "ice", "dtls", "rtp", "srtp", "rtcp", "rtx", "score"],
    rtcMinPort: 40000,
    rtcMaxPort: 49999,
  },
  mediaCodecForRouter: [
    {
      kind: "audio",
      mimeType: "audio/opus",
      preferredPayloadType: 100,
      clockRate: 48000,
      channels: 2,
      parameters: {
        useinbandfec: 1,
        usedtx: 1,
      },
      rtcpFeedback: [
        { type: "transport-cc", parameter: "" },
        { type: "nack", parameter: "" },
        { type: "nack", parameter: "pli" },
      ],
    },
    {
      kind: "video",
      mimeType: "video/VP8",
      preferredPayloadType: 101,
      clockRate: 90000,
      parameters: {
        "x-google-start-bitrate": 1000,
      },
      rtcpFeedback: [
        { type: "nack", parameter: "" },
        { type: "nack", parameter: "pli" },
        { type: "ccm", parameter: "fir" },
        { type: "goog-remb", parameter: "" },
      ],
    },
    {
      kind: "video",
      mimeType: "video/H264",
      preferredPayloadType: 102,
      clockRate: 90000,
      parameters: {
        "packetization-mode": 1,
        "profile-level-id": "42e01f",
        "level-asymmetry-allowed": 1,
      },
      rtcpFeedback: [
        { type: "nack", parameter: "" },
        { type: "nack", parameter: "pli" },
        { type: "ccm", parameter: "fir" },
        { type: "goog-remb", parameter: "" },
      ],
    },
  ],
});
export { mediasoupConfig };
