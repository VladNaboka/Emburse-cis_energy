import PSOClient from '../../components/pso/PSOClient';
import { useT } from '../../lib/ruMessages';
import './page.css';

export const metadata = { title: 'PSO | CIS ENERGY' };

export default function PSOPage() {
  return <PSOClient />;
}
