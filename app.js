import { fileURLToPath } from "url";
import { join, dirname } from "path";
import { fastifyEnv } from "@fastify/env";
import AutoLoad from "@fastify/autoload";

const schema = {
  type: "object",
  required: ["PORT"],
  properties: {
    PORT: {
      type: "string",
      default: 3000,
    },
  },
};

export const options = {
  schema: schema,
};

export default async function (fastify, opts) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  // Place here your custom code!

  // Do not touch the following lines
  fastify.register(fastifyEnv, options).ready((err) => {
    if (err) console.error(err);

    console.log(fastify.config); // or fastify[options.confKey]
  });

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: Object.assign({}, opts),
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    options: Object.assign({}, opts),
  });
}
