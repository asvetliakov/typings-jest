/**
 * Type definitions for jest test runner
 * Doesn't conflict with jasmine typings. Actually you need jasmine typings
 */

declare namespace Jest {
	interface JestStatic {
		/**
		 * Disables automatic mocking in the module loader.
		 */
		autoMockOff(): void;
		/**
		 * Re-enables automatic mocking in the module loader.
		 */
		autoMockOn(): void;
		/**
		 * Removes any pending timers from the timer system.
		 */
		clearAllTimers(): void;
		/**
		 * Returns the absolute path to the currently executing test file.
		 */
		currentTestPath(): void;
		/**
		 * Returns a new, unused mock function. Optionally takes a mock implementation.
		 */
		fn(implementation?: Function): Mock;
		/**
		 * @deprecated
		 * Same as fn()
		 */
		genMockFunction(): Mock;
		/**
		 * Given the name of a module, use the automatic mocking system to generate a mocked version of the module for you.
		 */
		genMockFromModule(moduleName: string): Mock;
		/**
		 * Indicates that the module system should always return a mocked version of the specified module from require() 
		 * (e.g. that it should never return the real module).
		 */
		mock(moduleName: string): Mock;
		/**
		 * Exhausts the micro-task queue (usually interfaced in node via process.nextTick).
		 */
		runAllTicks(): void;
		/**
		 * Exhausts the macro-task queue (i.e., all tasks queued by setTimeout() and setInterval()).
		 */
		runAllTimers(): void;
		/**
		 * Executes only the macro-tasks that are currently pending (i.e., only the tasks that have been queued by setTimeout() or setInterval() up to this point). 
		 * If any of the currently pending macro-tasks schedule new macro-tasks, those new tasks will not be executed by this call.
		 */
		runOnlyPendingTimers(): void;
		/**
		 * Explicitly supplies the mock object that the module system should return for the specified module.
		 */
		setMock(moduleName: string, moduleExports: any): void;
		/**
		 * Indicates that the module system should never return a mocked version of the specified module from require() (e.g. that it should always return the real module).
		 */
		unmock(moduleName: string): void;
		/**
		 * Same as unmock() but don't hoiste call to at top of the code block when using babel-jest
		 */
		dontMock(moduleName: string): void;
	}

	/**
	 * Mock calls
	 */
	interface MockCalls {
		[key: number]: any[];
	}

	/**
	 * Mock instances
	 */
	interface MockInstances {
		[key: number]: any;
	}

	/**
	 * Mock API
	 */
	interface Mock {
		(...params: any[]): any;
		/**
		 * Mock recording stuff
		 */
		mock: {
			/**
			 * An array that represents all calls that have been made into this mock function. 
			 * Each call is represented by an array of arguments that were passed during the call.
			 */
			calls: MockCalls;
			/**
			 * An array that contains all the object instances that have been instantiated from this mock function.
			 */
			instances: MockInstances;
		};
		/**
		 * Resets all information stored in the mockFn.mock.calls and mockFn.mock.instances arrays.
		 */
		mockClear(): void;
		/**
		 * Accepts a function that should be used as the implementation of the mock. 
		 * The mock itself will still record all calls that go into and instances that come from itself – the only difference is that the
		 * implementation will also be executed when the mock is called.
		 * Note: jest.fn(implementation) is a shorthand for mockImplementation.
		 */
		mockImplementation(implementation: Function): Mock;
		/**
		 * Return this
		 */
		mockReturnThis(): this;
		/**
		 * @deprecated
		 * Use jest.fn(() => value) instead.
		 */
		mockReturnValue(value: any): Mock;
		/**
		 * Return value only once
		 */
		mockReturnValueOnce(value: any): Mock;
	}
}


// Node require extensions
interface NodeRequire {
	/**
	 * Returns the actual module instead of a mock, bypassing all checks on whether the module should receive a mock implementation or not.
	 */
	requireActual(moduleName: string): any;
	/**
	 * Returns a mock module instead of the actual module, bypassing all checks on whether the module should be required normally or not.
	 */
	requireMock(moduleName: string): Jest.Mock;
}

// Jasmine Addiitons
// Async helpers
declare function pit(expectation: string, assertion?: () => PromiseLike<any>): void;
// Not in official docs but exists
declare function xpit(expectation: string, assertion?: () => PromiseLike<any>): void;

// Matcher additions
declare namespace jasmine {
	interface Matchers {
		/**
		 * The mock function was called at least once
		 */
		toBeCalled(): boolean;
		/**
		 * The mock function was called at least once with the specified args
		 */
		toBeCalledWith(...params: any[]): boolean;
		/**
		 * The last call to the mock function was called with the specified args
		 */
		lastCalledWith(...params: any[]): boolean;
	}
}


declare var jest: Jest.JestStatic;