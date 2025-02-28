import { Component, OnInit } from '@angular/core';
import { marked } from 'marked';
import { ReportAiService } from '../report-ai.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrl: './report-list.component.css'
})
export class ReportListComponent implements OnInit {

  selectedMonth!: any;
  months: any[] = [];

  editorContent: string = '';
  markdownText = ``
  dateStart: Date = new Date();
  dateEnd: Date = new Date();
  messageMonthRange = ''
  loadingReport = false;
  reportButton = true;

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  constructor(private reportAiService: ReportAiService) { }

  ngOnInit() {
    this.loadingListReports();
    
    const insightsElement = document.getElementById("insights");
    if (insightsElement) {
      const parsedContent = marked.parse(this.markdownText);
      if (parsedContent instanceof Promise) {
        parsedContent.then(content => insightsElement.innerHTML = content);
      } else {
        insightsElement.innerHTML = parsedContent;
      }
    }
  }

  private loadingListReports() {
    this.reportAiService.getReportAiResume().subscribe((data: any[]) => {
      this.months = data.map(month => {
        const date = new Date(month.referentMonth);
        this.dateStart = date;
        this.dateEnd = date;
        const monthName = date.toLocaleString('default', { month: 'long' }).toLocaleUpperCase();

        return { name: monthName, code: month.id };
      });
      this.verifyReportButtonVisible();
    });
  }

  private verifyReportButtonVisible() {
    this.reportButton = (new Date().getMonth() - (new Date().getMonth()-1)) != 1 || new Date().getMonth()  === this.months.length;  
  }


  generateReport() {
    this.loadingReport = true;
    this.reportAiService.createReportAi().subscribe({
      next: data => {
        this.markdownText = data.report.replace('\n\n', '<br><br>\n')
        this.updateComponenteReport();
        this. loadingListReports()
      },
      error(err) {
          console.error(err);
      },
    })
  }

  onChangeMonth() {
    this.loadingReport = true;
    this.reportAiService.getReportAiById(this.selectedMonth.code).subscribe((data: any) => {
      const date = new Date(data.referentMonth);
      this.dateStart = date;
      this.dateEnd = date;
      
      console.log('>>>>>>', date);
      console.log('>>>>>>', this.dateStart);
      console.log('>>>>>>', this.dateEnd);
      
      this.markdownText = data.report.replace('\n\n', '<br><br>\n')
      
      this.updateComponenteReport();
      this.verifyReportButtonVisible();
    })
  }

  private updateComponenteReport() {
    setTimeout(() => {
      this.loadingReport = false;
    }, 500);

    const insightsElement = document.getElementById("insights");
    if (insightsElement) {
      const parsedContent = marked.parse(this.markdownText);
      if (parsedContent instanceof Promise) {
        parsedContent.then(content => insightsElement.innerHTML = content);
      } else {
        insightsElement.innerHTML = parsedContent;
      }
    }
  }
}
