import { Component, Inject, OnInit, PLATFORM_ID, StaticProvider } from '@angular/core';
import { CategoryService } from '@services/category';
import { CompanyService } from '@services/company';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { isPlatformBrowser } from '@angular/common';
import { CompanyInterface } from '@models/company';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '@app/services/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class HeaderComponent implements OnInit {
  keyword = '';
  categoryItems: MenuItem[] = [];
  profileItems: MenuItem[] = [];
  topMenuActive: boolean = false;
  topMenuButtonClick: boolean = false;
  topMenuLeaving: boolean = false;
  menuClick: boolean = false;
  overlayMenuActive: boolean = false;
  staticMenuInactive: boolean = false;
  company: CompanyInterface;

  constructor(
    private categoryService: CategoryService,
    private companyService: CompanyService,
    @Inject(PLATFORM_ID) private platformId: StaticProvider[],
    private translate: TranslateService,
    public router: Router,
    private userService: UserService
  ) {}

  loadCategories() {
    let tag = '';
    this.translate.get('header.categories').subscribe((res: string) => {
      tag = res;
    });
    this.categoryService.getCategories().subscribe((data) => {
      if (isPlatformBrowser(this.platformId)) {
        this.categoryItems = [
          {
            icon: 'pi pi-microsoft',
            label: tag,
            items: data.map((e) => {
              return { label: e.name };
            }),
          },
        ];
      }
    });
  }

  loadMenu() {
    this.translate.get('header').subscribe((tag) => {
      this.profileItems = [
        {
          icon: 'pi pi-shopping-cart',
          label: '',
        },
        {
          icon: 'pi pi-user',
          label: '',
          items: [
            { label: tag.MyOrders },
            { label: tag.MyProfile, routerLink: 'profile' },
            { label: tag.help },
            { label: tag.logout, routerLink: 'login',  command:() => this.logout(), id:'logout'},
          ],
        },
      ];
    });
  }

  logout(): void {
    this.userService.logout();
  }

  loadDataCompany() {
    this.companyService.getCompany().subscribe((data) => {
      this.company = data;
    });
  }

  toggleTopMenu(event: Event) {
    this.topMenuButtonClick = true;

    if (this.topMenuActive) {
      this.hideTopMenu();
    } else {
      this.topMenuActive = true;
    }

    event.preventDefault();
  }

  hideTopMenu() {
    this.topMenuLeaving = true;
    setTimeout(() => {
      this.topMenuActive = false;
      this.topMenuLeaving = false;
    }, 1);
  }

  ngOnInit() {
    this.loadCategories();
    this.loadDataCompany();
    this.loadMenu();
  }

  search() {
    if (this.keyword.length > 0) {
      this.router.navigate([`/search/${this.keyword}`]);
    }
  }

  searchKeyEnter(event: Event): void {
    this.search();
  }
}
