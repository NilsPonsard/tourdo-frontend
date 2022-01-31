/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    async rewrites() {

        let destination = "https://woa-backend.juno.nponsard.net/api/:path*";
        if (process.env.BACKEND_URL)
            destination = process.env.BACKEND_URL;
        else if (process.env.NODE_ENV != "production")
            destination = 'http://localhost:8080/api/:path*';


        return [
            {
                source: '/api/:path*',
                destination
            }
        ];

    }

};
