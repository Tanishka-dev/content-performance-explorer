import { summaryHandler } from './summary.handler';
import { pagesHandler } from './pages.handlers';
import { timeseriesHandler } from './timeseries.handler';

const handlers = [summaryHandler, pagesHandler, timeseriesHandler];

export default handlers;