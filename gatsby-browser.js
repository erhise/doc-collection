// exports.onServiceWorkerUpdateFound = () => {
//   const answer = window.prompt(
//     `This application has been updated. ` +
//     `Reload to display the latest version?`
//   )

//   if (answer === true) {
//     window.reload()
//   }
// }

exports.onServiceWorkerUpdateFound = () => window.location.reload(true);