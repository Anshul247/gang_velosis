const redis = require("redis");
const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});
const { promisify } = require("util");


const redisConnectionHelper = {

    getKeys: async (pattern) => {
        try {

            const getAsync = promisify(client.keys).bind(client);
            const res = await getAsync(pattern);
            return res;

        } catch (err) {
            console.error(`[helpers][redis][getKeys]: Error:`, err);
            return err;
        }
    },

    getValue: async (key) => {
        try {

            const getAsync = promisify(client.get).bind(client);

            const res = await getAsync(key);
            return res ? JSON.parse(res) : null;

        } catch (err) {
            console.error(`[helpers][redis][getValue]: Error:`, err);
            return err;
        }
    },

    setValue: async (key, value) => {
        try {

            value = JSON.stringify(value);
            const setAsync = promisify(client.set).bind(client);
            await setAsync(key, value);

            // console.log(`[helpers][redis][setValue]: Value set successfully for key:`, key, 'Value:', value);
            console.log(`[helpers][redis][setValue]: Value set successfully for key:`, key);
            return {};

        } catch (err) {
            console.error(`[helpers][redis][setValue]: Error:`, err);
            return err;
        }
    },

    setValueWithExpiry: async (key, value, seconds) => {
        try {

            value = JSON.stringify(value);
            const setAsync = promisify(client.setex).bind(client);
            await setAsync(key, seconds, value);

            // console.log(`[helpers][redis][setValue]: Value set with expiry ${seconds} successfully for key:`, key, 'Value:', value);
            console.log(`[helpers][redis][setValue]: Value set with expiry ${seconds} successfully for key:`, key);

            return {};

        } catch (err) {
            console.error(`[helpers][redis][setValueWithExpiry]: Error:`, err);
            return err;
        }
    },

    removeKey: async (key) => {
        try {

            const removeAsync = promisify(client.del).bind(client);
            let r = await removeAsync(key);
            console.log(`[helpers][redis][removeKey]: Value set for key:`, key, 'is removed');

            return r;

        } catch (err) {
            console.error(`[helpers][redis][removeKey]: Error:`, err);
            return err;
        }
    },

    removeKeys: async (pattern) => {
        try {

            const getAsync = promisify(client.keys).bind(client);
            const allMatchedKeys = await getAsync(pattern);
            console.log(`[helpers][redis][removeKeys]: for pattern: ${pattern} - allMatchedKeys:`, allMatchedKeys);

            const removeAsync = promisify(client.del).bind(client);

            for (const key of allMatchedKeys) {
                let r = await removeAsync(key);
                console.log(`[helpers][redis][removeKeys]: Value set for key:`, key, 'is removed');
            }

            return allMatchedKeys;

        } catch (err) {
            console.error(`[helpers][redis][removeKey]: Error:`, err);
            return err;
        }
    },

    increment: async (key, incrementBy = 1) => {
        try {

            if (incrementBy > 1) {
                const incrAsync = promisify(client.incrby).bind(client);
                let r = await incrAsync(key, incrementBy);
            } else {
                const incrAsync = promisify(client.incr).bind(client);
                let r = await incrAsync(key);
            }
            return r;

        } catch (err) {
            console.error(`[helpers][redis][removeKey]: Error:`, err);
            return err;
        }
    },

};

module.exports = redisConnectionHelper;