# load-azure-credentials-task
Simple build/deploy task for loading credentials into an Azure DevOps pipeline.

This task is needed for a very specific use case. It's a workaround for dynamically supplying a "Azure subscription" to Azure related tasks that require a subscription. 

Here's a breakdown of the problem:<br/>
1.) You create an awesome release pipeline for deploying your app service but you need to deploy your app service accross multiple subscriptions.<br/>
2.) You save you release pipeline steps as a "task group" and attempt to specify the AzureSubscription as a variable.<br/>
3.) Everything seems to work properly, but your deployment fails with the following error:<br/>
2019-02-06T19:19:47.1729258Z ##[error]Error: Endpoint auth data not present: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx


After some debugging, I found that the pipeline is missing some essential pieces:<br/>
2019-02-07T18:53:01.4445974Z ##[debug]loading ENDPOINT_AUTH_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx<br/>
2019-02-07T18:53:01.4458070Z ##[debug]loading ENDPOINT_AUTH_PARAMETER_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx_AUTHENTICATIONTYPE<br/>
2019-02-07T18:53:01.4460355Z ##[debug]loading ENDPOINT_AUTH_PARAMETER_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx_SERVICEPRINCIPALID<br/>
2019-02-07T18:53:01.4462946Z ##[debug]loading ENDPOINT_AUTH_PARAMETER_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx_SERVICEPRINCIPALKEY<br/>
2019-02-07T18:53:01.4464455Z ##[debug]loading ENDPOINT_AUTH_PARAMETER_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx_TENANTID<br/>
2019-02-07T18:53:01.4465852Z ##[debug]loading ENDPOINT_AUTH_PARAMETER_SYSTEMVSSCONNECTION_ACCESSTOKEN<br/>
2019-02-07T18:53:01.4467811Z ##[debug]loading ENDPOINT_AUTH_SCHEME_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx<br/>

I'm guessing the Azure DevOps pipeline loads those pieces based on static input from the pipeline. So the steps are skipped when you attempt use a variable. The workaround is to call this task with static data before you attempt to dynamically specify the "Azure subscription".  You must supply the "Azure subscription" as the string you see in the error.  So something like:
$(subscription) = xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

Finally, this task returns the special endpoint string (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx) in case you want to save it as a variable to use for later.
