import chalk from 'chalk';

export const styledMethod = method => {
  let type: string;
  switch (method) {
    case 'GET':
      type = chalk.blue(method);
      break;
    case 'POST':
      type = chalk.green(method);
      break;
    case 'PUT':
      type = chalk.hex('#FFA500')(method);
      break;
    case 'DELETE':
      type = chalk.red(method);
    case 'PATCH':
      type = chalk.hex('#90EE90')(method);
      break;
    default:
      type = chalk.gray(method);
      break;
  }
  return type;
};

export const styledStatus = code => {
  let status: string;
  const sw = Math.floor(code / 100);
  switch (sw) {
    case 2:
      status = chalk.green(code);
      break;
    case 3:
      status = chalk.blue(code);
      break;
    case 4:
      status = chalk.red(code);
      break;
    case 5:
      status = chalk.hex('#FFA500')(code);
      break;
    default:
      status = chalk.gray(code);
      break;
  }
  return status;
};
