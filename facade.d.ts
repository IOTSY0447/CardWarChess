
declare namespace facade {
    /**
     * Register an @ICommand with the @IController associating it to a
     * @INotification name.
     * 
     * @param notificationName
     *		The name of the @INotification to associate the @ICommand
        *		with.
        *
        * @param commandClassRef
        * 		A reference to the constructor of the @ICommand .
        */
    export function registerCommand(notificationName: string, commandClassRef: Function): void;

    /**
     * Remove a previously registered @ICommand to @INotification
     * mapping from the @Controller .
     *
     * @param notificationName
     *		The name of the @INotification to remove the @ICommand
        *		mapping for.
        */
    export function removeCommand(notificationName: string): void;

    /**
     * Check if an @ICommand is registered for a given @Notification .
     * 
     * @param notificationName
     * 		The name of the @INotification to verify for the existence of a
     * 		@ICommand mapping for.
     *
     * @return
     * 		A @Command is currently registered for the given
     *		@notificationName .
        */
    export function hasCommand(notificationName: string): boolean;

    /**
     * Register an @IProxy with the @Model by name.
     *
     * @param proxy
     *		The @IProxy to be registered with the @Model .
        */
    export function registerProxy(proxy: IProxy): void;

    /**
     * Retrieve an @IProxy from the @Model by name.
     * 
     * @param proxyName
     * 		The name of the @IProxy to be retrieved.
     *
     * @return
     * 		The @IProxy previously registered with the given @proxyName .
     */
    export function retrieveProxy<T extends IProxy>(proxyName: string): T;

    /**
     * Remove an @IProxy from the @Model by name.
     *
     * @param proxyName
     *		The @IProxy to remove from the @Model .
        *
        * @return
        *		The @IProxy that was removed from the @Model 
        */
    export function removeProxy(proxyName: string): IProxy;

    /**
     * Check if a @Proxy is registered.
     * 
     * @param proxyName
     * 		The @IProxy to verify the existence of a registration with the
     *		@IModel .
        *
        * @return
        * 		A @Proxy is currently registered with the given	@proxyName .
        */
    export function hasProxy(proxyName: string): boolean;

    /**
     * Register a @IMediator with the @IView .
     *
     * @param mediator
            A reference to the @IMediator .
        */
    export function registerMediator(mediator: IMediator): void;

    /**
     * Retrieve an @IMediator from the @IView .
     * 
     * @param mediatorName
     * 		The name of the registered @Mediator to retrieve.
     *
     * @return
     *		The @IMediator previously registered with the given
        *		@mediatorName .
        */
    export function retrieveMediator(mediatorName: string): IMediator;

    /**
     * Remove an @IMediator from the @IView .
     * 
     * @param mediatorName
     * 		Name of the @IMediator to be removed.
     *
     * @return
     *		The @IMediator that was removed from the @IView 
        */
    export function removeMediator(mediatorName: string): IMediator;

    /**
     * Check if a Mediator is registered or not
     * 
     * @param mediatorName
     * 		The name of the @IMediator to verify the existence of a registration
     *		for.
        *
        * @return
        * 		An @IMediator is registered with the given @mediatorName .
        */
    export function hasMediator(mediatorName: string): boolean;

    /**
     * Notify the @IObservers for a particular @INotification .
     *
     * This method is left public mostly for backward compatibility, and to allow you to send
     * custom notification classes using the facade.
     *
     * Usually you should just call sendNotification and pass the parameters, never having to
     * construct the notification yourself.
     * 
     * @param notification
     * 		The @INotification to have the @IView notify
     *		@IObserver s	of.
        */
    export function notifyObservers(notification: INotification): void;
    /**
     * Create and send a @Notification .
     *
     * Keeps us from having to construct new @Notification instances in our
     * implementation code.
     * 
     * @param name
     * 		The name of the notification to send.
     * 
     * @param body
     * 		The body of the notification (optional).
     *
     * @param type
     * 		The type of the notification (optional).
     */
    export function sendNotification(name: string, body?: any, type?: string): void;
}
