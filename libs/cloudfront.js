const AWS = require('aws-sdk')

class cloudfront {
  /**
   * constructor
   *
   **/
  constructor () {
    this.cloudfront = new AWS.CloudFront()
  }
  /**
   * Get CloudFront Distribution
   *
   * @param {string} distributionId - CloudFront Distribution ID
   * @return {Promise} result of cloudfront.getDistribution api
   **/
  getDistribution(distributionId) {
    const param = {
      Id: distributionId
    }
    return this.cloudfront.getDistribution(param).promise()
  }
  /**
   * update CloudFront distribution config
   *
   * @param {object} params - update params
   * @return {Promise} result of cloudfront.updateDistribution api
   **/
  updateDistribution (params) {
    return this.cloudfront.updateDistribution(params).promise()
  }
  /**
   * list cloudfront distributions
   *
   * @param {string} [marker=''] - next marker for listDistribution api
   * @return {Promise} result of cloudfront.updateDistribution api
   **/
  listDistribution(marker = '') {
    const params = {
      Marker: marker,
      MaxItems: '1'
    };
    return this.cloudfront.listDistributions(params).promise()
  }
}

module.exports = cloudfront
