import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Company } from '../../../interfaces/companies.interface';
import { FiltersStore } from '../../../store/filters.store';

@Component({
  selector: 'app-company-filter',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './company-filter.component.html',
  styleUrls: ['./company-filter.component.scss'],
})
export class CompanyFilterComponent {
  private filtersStore = inject(FiltersStore);

  @Input() set companies(value: Company[]) {
    this.companies$.set(value);
  }

  private readonly companies$ = signal<Company[]>([]);
  readonly searchTerm$ = signal('');
  readonly showAll$ = signal(false);
  readonly itemsToShow = 5;

  readonly filteredCompanies = computed(() =>
    this.companies$().filter((company) => company.name.toLowerCase().includes(this.searchTerm$().toLowerCase())),
  );

  readonly visibleCompanies = computed(() =>
    this.showAll$() ? this.filteredCompanies() : this.filteredCompanies().slice(0, this.itemsToShow),
  );

  readonly buttonText = computed(() => (this.showAll$() ? 'Show less' : 'Show more'));

  toggleShowAll(): void {
    this.showAll$.update((current) => !current);
  }

  updateSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm$.set(input.value);
  }

  isSelected(company: Company): boolean {
    return this.filtersStore.companies().some((c) => c.documentNumber === company.documentNumber);
  }

  onCompanySelect(company: Company, checked: boolean) {
    const currentSelectedCompanies = [...this.filtersStore.companies()];

    if (checked) {
      if (!currentSelectedCompanies.some((c) => c.documentNumber === company.documentNumber)) {
        currentSelectedCompanies.push(company);
      }
    } else {
      const index = currentSelectedCompanies.findIndex((c) => c.documentNumber === company.documentNumber);
      if (index !== -1) {
        currentSelectedCompanies.splice(index, 1);
      }
    }

    this.filtersStore.updateFilters({ companies: currentSelectedCompanies });
  }
}
