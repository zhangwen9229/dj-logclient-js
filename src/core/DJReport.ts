class Qweb {
    public readonly config: {
        readonly chainId: string;
        readonly baseUrl: string;
    };

    public constructor(config: {
        readonly chainId: string;
        readonly baseUrl: string;
    }) {
        this.config = config;
    }

    public get request() {
        return '';
    }
}

export default Qweb;
