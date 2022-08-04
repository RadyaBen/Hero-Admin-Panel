import { HeroesList } from '../HeroesList';
import { HeroesAddForm } from '../HeroesAddForm';
import { HeroesFilters } from '../HeroesFilters';

import './App.scss';

const App = () => {

	return (
		<main className="app">
			<div className="content">
				<HeroesList />
				<div className="content__interactive">
					<HeroesAddForm />
					<HeroesFilters />
				</div>
			</div>
		</main>
	);
};

export { App };