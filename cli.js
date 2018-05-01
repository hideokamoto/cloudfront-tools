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
  .version('0.0.1', '-v, --version')

// update all distribution config
program.command('update-all')
  .description('Update ALL CloudFront distributions')
  .option("-d, --body <config>", "updated distribution config")
  .action((options) => {
    const config = options.config != null ? JSON.parse(options.config) : {}
    console.log(config)
  })

// update single distribution config
program.command('update')
  .description('Update CloudFront distributions')
  .option("-i, --distribution_id <distribution_id>", "CloudFront distribution id")
  .option("-d, --body <config>", "updated distribution config")
  .action((options) => {
    const distId = options.distribution_id || ''
    console.log(distId)
    if (!distId) {
      console.error(chalk.red('[Error]: --distribution_id is required.'))
      return
    }
    const config = options.config != null ? JSON.parse(options.config) : {}
    const wf = new UpdateDistribution()
    wf.updateWorkflow(distId, config)
      .then(() => console.log('update succeeded'))
      .catch(err => console.log(chalk.red('[Error]: fail to update distribution\n'), err))
  })

program.parse(process.argv)

// For default, show help
const NO_COMMAND_SPECIFIED = program.args.length === 0;
if (NO_COMMAND_SPECIFIED) {
  // e.g. display usage
  program.help();
}
