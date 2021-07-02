exports.handler = async (event) => {
  event.Records.forEach((record) => {
    console.log('Record: %j', record);
  });
};