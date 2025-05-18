module.exports = {
    apps: [
        {
            name: 'nestjs-app',
            script: 'dist/main.js',
            instances: 1,
            autorestart: true,
            watch: false,
            env: {
                NODE_ENV: 'production',
            },
        },
    ],
};