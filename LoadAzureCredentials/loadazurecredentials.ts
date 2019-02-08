import tl = require('azure-pipelines-task-lib/task');

async function run() {
    try {
        var connectedServiceName = tl.getInput('ConnectedServiceName', true);
        tl.debug('Found service: ' + connectedServiceName);
        tl.setVariable('ConnectedServiceNameIdentifier', connectedServiceName);
    }
    catch(exception) {
        tl.setResult(tl.TaskResult.Failed, exception);
    }
}

run();