import { JsonAsset, resources } from 'cc';

const loadConfig = (url: any) => {
	return new Promise<any>((resolve, reject) => {
		resources.load(url, JsonAsset, (error, asset) => {
			if (error) {
				reject(error);
			}

			resolve(asset.json);
		});
	});
};

export default loadConfig;
