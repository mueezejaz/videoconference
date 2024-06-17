const mediasoupConfig = Object.freeze({
  worker: {
    logLevel: "debug",
    logTags: ["info", "ice", "dtls", "rtp", "srtp", "rtcp", "rtx", "score"],
    rtcMinPort: 40000,
    rtcMaxPort: 49999,
  },
});
export { mediasoupConfig };
