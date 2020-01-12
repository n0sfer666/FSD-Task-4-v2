import { Helper } from './entities/Helper';

export class View extends Helper {



    constructor( private container: HTMLDocument, private configuration: I_Configuration_View ) {
        super();
        
    }
}