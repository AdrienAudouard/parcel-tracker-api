import {XmlEntities} from 'html-entities';

class StringService {
    decode(str: string): string {
        const entities = new XmlEntities();
        return entities.decode(str);
    }
}

export default new StringService();
