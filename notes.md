switchMap Operator:
Takes each value emitted by the source observable, applies a function that returns an observable, and switches to the observable returned by the function.
switchMap can switch to a new observable for each value, effectively flattening nested observables.

if the source observable emits quickly, switchMap will switch to the latest emitted observable and discard the previous one. This can be useful for scenarios such as typeaheads where you are no longer concerned with the response of the previous request when a new input arrives.

let's say source will send 1 then 2 then 3 and we want to apply a function that lasts for 1 sec
in the case of subscribe, it will print 1 then 2 then 3 regreardless of the time it takes to apply the function
in the case of switchMap, it will print 3 only because it will switch to the latest observable and discard the previous ones (1 and 2 will be discarded if the source emits quickly [ less than 1 sec ])

forkJoin: It's an operator in RxJS that takes an array of observables and waits for all of them to complete. It then combines their last emitted values into an array and emits that array as a single observable.

pipe is self explanatory, it's used to pipe operators together ( Observables in the case of RxJS )
