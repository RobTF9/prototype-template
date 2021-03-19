/* eslint-disable class-methods-use-this */
import 'core-js/es/object/assign';
import 'core-js/modules/es.promise';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import ReactHabitat from 'react-habitat';

const Event = React.lazy(() => import('./event'));
const PublicLeaderboard = React.lazy(() => import('./publicLeaderboard'));
const Hints = React.lazy(() => import('./challenge/Hints/index'));
const TagSelect = React.lazy(() => import('../components/TagSelect/index'));
const ManageEvent = React.lazy(() => import('./newManageEvent'));
const PlayerReport = React.lazy(() => import('../components/PlayerReport'));

class SuspenseFactory {
  inject(module, props, target) {
    if (target) {
      const el = React.createElement(module, props || {});

      ReactDOM.render(
        <Suspense
          fallback={
            <div className="loading-wrapper">
              <img
                src="/assets/images/spinner.svg"
                alt="Loading Spinner"
                className="image"
              />
            </div>
          }
        >
          {el}
        </Suspense>,
        target
      );
    } else {
      console.warn('Target element is null or undefined.');
    }
  }

  dispose(target) {
    if (target) {
      ReactDOM.unmountComponentAtNode(target);
    }
  }
}

class App extends ReactHabitat.Bootstrapper {
  constructor() {
    super();

    // Create a new container builder:
    const builder = new ReactHabitat.ContainerBuilder();
    builder.factory = new SuspenseFactory();

    // Register a component:
    builder.register(Event).as('Event');
    builder.register(PublicLeaderboard).as('PublicLeaderboard');
    builder.register(Hints).as('Hints');
    builder.register(TagSelect).as('TagSelect');
    builder.register(ManageEvent).as('ManageEvent');
    builder.register(PlayerReport).as('PlayerReport');

    // Finally, set the container:
    this.setContainer(builder.build());
  }
}

// Create a single instance of our app
const instance = new App();
window.updateHabitat = instance.update.bind(instance);

// Export the instance
export default instance;
