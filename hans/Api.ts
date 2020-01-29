import {Get, Post, App, Middleware, JsonResponse, State} from '@loremipsum/mocking-hans';
import {EnableCors} from './middleware/EnableCors';
import {IsAuthenticated} from './middleware/IsAuthenticated';

@App({
    name: 'yass',
    port: 4999,
    middleware: [EnableCors],
})
export class Api {
    private localState: State = new State();

    constructor() {
        this.localState.set('restaurants', require('./data/restaurants.json'));
    }

    /**
     * API Root
     */
    @Get('/')
    index() {
        return new JsonResponse({
            'status': true,
            'message': 'Server is running',
        });
    }

    /**
     * List all restaurants
     */
    @Get('/restaurants')
    // @Middleware([IsAuthenticated])
    restaurants(request) {
        let restaurants = this.localState.get('restaurants');
        return new JsonResponse(restaurants);
    }

    /**
     * Get one restaurant
     */
    @Get('/restaurants/*')
    // @Middleware([IsAuthenticated])
    restaurant(request) {
        let restaurants = this.localState.get('restaurants');
        return new JsonResponse(restaurants[Math.floor(Math.random() * restaurants.length)]);
    }

}
