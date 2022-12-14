//ecosystem.config.js
module.exports = {
    apps: [
      {
        name: "aerchain",
        script: "server.js",
        instances: 0,
        exec_mode: "cluster",
        watch: ".",
      },
    ],
    deploy: {
      development: {
        // user: "YOUR_SSH_USERNAME_HERE",
        // host: "YOUR_SSH_HOST_ADDRESS",
        // ref: "YOUR_GIT_BRANCH_REF (eg: origin/master)",
        // repo: "GIT_REPOSITORY",
        // path: "YOUR_DESTINATION_PATH_ON_SERVER",
        "pre-deploy-local": "",
        "post-deploy":"npm install && pm2 reload pm2.config.js --env development",
        "pre-setup": "",
      },
    },
  };