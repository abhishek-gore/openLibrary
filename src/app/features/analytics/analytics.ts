import { Component, computed, inject } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Store } from '@ngrx/store';
import { selectAnalytics } from './analytics.selectors';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { MatGridListModule } from '@angular/material/grid-list';

interface AnalyticsData {
  totalBooks: number;
  ebookAccess: {
    hasAccess: number;
    noAccess: number;
  },
  decades: {
    decade: string;
    count: number;
  }[]
}
@Component({
  selector: 'app-analytics',
  imports: [SharedModule, BaseChartDirective, MatGridListModule],
  templateUrl: './analytics.html',
  styleUrl: './analytics.scss',
  providers: [provideCharts(withDefaultRegisterables())]
})
export class Analytics {
  private store = inject(Store);
  analytics = this.store.selectSignal<AnalyticsData>(selectAnalytics);

  barChartType: ChartType = 'bar';
  barChartData = computed<ChartData<'bar'>>(() => ({
    labels: this.analytics().decades.map(d => d.decade),
    datasets: [
      {
        data: this.analytics().decades.map(d => d.count) || [],
        backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
        '#9966FF', '#FF9F40', '#8AC24A', '#FF6384'
      ]
      }
    ]
  }))
  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: { beginAtZero: true }
    }, plugins: {
      legend: {
        display: false
      }
    }
  };

  pieChartData = computed<ChartData<'pie'>>(() => ({
    labels: ['Has Access', 'No Access'],
    datasets: [{
      data: [
        this.analytics()?.ebookAccess?.hasAccess || 0,
        this.analytics()?.ebookAccess?.noAccess || 0
      ]
    }]
  }))
  pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      }
    }
  };
  pieChartType: ChartType = 'pie'

}
