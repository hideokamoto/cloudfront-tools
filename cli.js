#!/usr/bin/env node

/**
 * Module dependencies.
 */
const program = require('commander')
const chalk = require('chalk')

// libs
const UpdateDistribution = require('./libs/updateDistribution')

// version information
program
  .version('1.0.1', '-v, --version')

/*
// update all distribution config
program.command('update-all')
  .description('Update ALL CloudFront distributions')
  .option("-d, --body <config>", "updated distribution config")
  .action((options) => {
    if (!options.body) {
      console.error(chalk.red('[Error]: --body is required.'))
      return
    }
    const config = JSON.parse(options.body)
    console.log(config)
    const wf = new UpdateDistribution()
    wf.updateAllDistribution(config)
      .then(() => console.log(chalk.green(`[Success]: Success to send update request.`)))
      .catch(err => console.log(chalk.red('[Error]: Fail to update distribution\n'), err))
  })
*/

// update single distribution config
program.command('update')
  .description('Update CloudFront distributions')
  .option("-i, --distribution_id <distribution_id>", "CloudFront distribution id")
  .option("-d, --body <config>", "updated distribution config")
  .action((options) => {
    const distId = options.distribution_id || ''
    console.log(chalk.green(`[Start]: Start to update the distribution - ${distId}`))
    if (!distId) {
      console.error(chalk.red('[Error]: --distribution_id is required.'))
      return
    }
    if (!options.body) {
      console.error(chalk.red('[Error]: --body is required.'))
      return
    }
    const config = JSON.parse(options.body)
    const wf = new UpdateDistribution()
    wf.updateWorkflow(distId, config)
      .then(() => console.log(chalk.green(`[Success]: Success to send update request for the distribution - ${distId}`)))
      .catch(err => console.log(chalk.red('[Error]: Fail to update distribution\n'), err))
  })

program.parse(process.argv)

// For default, show help
const NO_COMMAND_SPECIFIED = program.args.length === 0;
if (NO_COMMAND_SPECIFIED) {
  // e.g. display usage
  program.help();
}
