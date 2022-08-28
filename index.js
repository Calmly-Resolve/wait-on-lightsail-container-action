const core = require("@actions/core");
const { execSync } = require("child_process");

const containerService = core.getInput("container-service");
if (!containerService) {
  core.setFailed("No container service provided");
}
const timeout = (parseInt(core.getInput("timeout")) ?? 300) * 1000;
const interval = (parseInt(core.getInput("interval")) ?? 10) * 1000;

const startTime = Date.now();

const doCheck = () => {
  setTimeout(() => {
    try {
      let stdout = execSync(
        `aws lightsail get-container-services --service-name ${containerService}`
      );
      const state = JSON.parse(stdout.toString()).containerServices[0].state;
      console.log(state);
      if (state === "RUNNING") {
        console.log(`Container service ${containerService} is running`);
      } else if (Date.now() - startTime > timeout) {
        core.setFailed("Timed out waiting");
      } else {
        doCheck();
      }
    } catch (error) {
      core.setFailed(error.message);
    }
  }, interval);
};

doCheck();
