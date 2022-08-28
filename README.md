# wait-on-lightsail-container-action

This action blocks the workflow until a aws lightsail container deployment is complete.

## Inputs

## `container-service`

**Required** The name of the service to wait on.

## `timeout`

The maximum amount of time to wait in seconds, fails the workflow if the deployment takes longer. Default `300s`.

## `interval`

The time interval between each check. Default `10s`.
## Example usage

uses: actions/wait-on-lightsail-container-action@v1
with:
  container-service: 'my-lightsail-container-service'