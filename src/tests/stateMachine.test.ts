import Tests, {test} from "../tests";
import {StateMachine} from "../stateMachine";

export const StateMachineTest = () => {

    const state = new StateMachine<number>();
    state.add('1', 1);
    state.add('2', 2);
    state.add('3', 3);

    state.activate('1');

    return Tests.run([

    ]);
}