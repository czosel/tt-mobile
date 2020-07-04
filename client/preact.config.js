import envVars from "preact-cli-plugin-env-vars";
import CopyWebpackPlugin from "copy-webpack-plugin";

export default function (config, env, helpers) {
  envVars(config, env, helpers);
  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [{ context: `${__dirname}/src/assets`, from: `*.*` }],
    })
  );
}
