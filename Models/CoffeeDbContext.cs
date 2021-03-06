using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace CoffeeManagement.Models
{
    public partial class CoffeeDbContext : DbContext
    {

        public CoffeeDbContext()
        {
        }

        public CoffeeDbContext(DbContextOptions<CoffeeDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Bill> Bills { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Customer> Customers { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<Orderdetail> Orderdetails { get; set; }
        public virtual DbSet<Orderdetailstate> Orderdetailstates { get; set; }
        public virtual DbSet<Orderstate> Orderstates { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<Staff> Staffs { get; set; }
        public virtual DbSet<Staffaccount> Staffaccounts { get; set; }
        public virtual DbSet<Table> Tables { get; set; }
        public virtual DbSet<Tablestate> Tablestates { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlite("Data Source=CoffeeDb.db");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Bill>(entity =>
            {
                entity.ToTable("BILLS");

                entity.Property(e => e.Id)
                    .HasColumnType("INT")
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.Customername)
                    .IsRequired()
                    .HasColumnType("NVARCHAR(100)")
                    .HasColumnName("CUSTOMERNAME");

                entity.Property(e => e.Idcustomer)
                    .HasColumnType("INT")
                    .HasColumnName("IDCUSTOMER");

                entity.Property(e => e.Idstaff)
                    .HasColumnType("INT")
                    .HasColumnName("IDSTAFF");

                entity.Property(e => e.Paytime)
                    .HasColumnType("DATETIME")
                    .HasColumnName("PAYTIME");

                entity.HasOne(d => d.IdNavigation)
                    .WithOne(p => p.Bill)
                    .HasForeignKey<Bill>(d => d.Id)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.IdcustomerNavigation)
                    .WithMany(p => p.Bills)
                    .HasForeignKey(d => d.Idcustomer);

                entity.HasOne(d => d.IdstaffNavigation)
                    .WithMany(p => p.Bills)
                    .HasForeignKey(d => d.Idstaff);
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("CATEGORIES");

                entity.Property(e => e.Id)
                    .HasColumnType("INT IDENTITY")
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.Name)
                    .HasColumnType("NVARCHAR(100)")
                    .HasColumnName("NAME");
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.ToTable("CUSTOMERS");

                entity.Property(e => e.Id)
                    .HasColumnType("INT IDENTITY")
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.Address)
                    .HasColumnType("NVARCHAR")
                    .HasColumnName("ADDRESS");

                entity.Property(e => e.Birthday)
                    .HasColumnType("DATETIME")
                    .HasColumnName("BIRTHDAY");

                entity.Property(e => e.Code)
                    .HasColumnType("VARCHAR(15)")
                    .HasColumnName("CODE");

                entity.Property(e => e.Name)
                    .HasColumnType("NVARCHAR(100)")
                    .HasColumnName("NAME");

                entity.Property(e => e.Phone)
                    .HasColumnType("VARCHAR(15)")
                    .HasColumnName("PHONE");

                entity.Property(e => e.Point)
                    .HasColumnType("FLOAT")
                    .HasColumnName("POINT")
                    .HasDefaultValueSql("0");

                entity.Property(e => e.Sex)
                    .HasColumnType("NVARCHAR(20)")
                    .HasColumnName("SEX");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.ToTable("ORDERS");

                entity.Property(e => e.Id)
                    .HasColumnType("INT IDENTITY")
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.Idstate)
                    .HasColumnType("INT")
                    .HasColumnName("IDSTATE");

                entity.Property(e => e.Idtable)
                    .HasColumnType("INT")
                    .HasColumnName("IDTABLE");

                entity.HasOne(d => d.IdstateNavigation)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.Idstate);

                entity.HasOne(d => d.IdtableNavigation)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.Idtable);
            });

            modelBuilder.Entity<Orderdetail>(entity =>
            {
                entity.ToTable("ORDERDETAILS");

                entity.Property(e => e.Id)
                    .HasColumnType("INT IDENTITY")
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.Count)
                    .HasColumnType("INT")
                    .HasColumnName("COUNT");

                entity.Property(e => e.Idorder)
                    .HasColumnType("INT")
                    .HasColumnName("IDORDER");

                entity.Property(e => e.Idproduct)
                    .HasColumnType("INT")
                    .HasColumnName("IDPRODUCT");

                entity.Property(e => e.Idstate)
                    .HasColumnType("INT")
                    .HasColumnName("IDSTATE");

                entity.Property(e => e.Ordertime)
                    .HasColumnType("DATETIME")
                    .HasColumnName("ORDERTIME");

                entity.HasOne(d => d.IdorderNavigation)
                    .WithMany(p => p.Orderdetails)
                    .HasForeignKey(d => d.Idorder);

                entity.HasOne(d => d.IdproductNavigation)
                    .WithMany(p => p.Orderdetails)
                    .HasForeignKey(d => d.Idproduct);

                entity.HasOne(d => d.IdstateNavigation)
                    .WithMany(p => p.Orderdetails)
                    .HasForeignKey(d => d.Idstate);
            });

            modelBuilder.Entity<Orderdetailstate>(entity =>
            {
                entity.ToTable("ORDERDETAILSTATES");

                entity.Property(e => e.Id)
                    .HasColumnType("INT IDENTITY")
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.Name)
                    .HasColumnType("NVARCHAR(100)")
                    .HasColumnName("NAME");
            });

            modelBuilder.Entity<Orderstate>(entity =>
            {
                entity.ToTable("ORDERSTATES");

                entity.Property(e => e.Id)
                    .HasColumnType("INT IDENTITY")
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.Name)
                    .HasColumnType("NVARCHAR(100)")
                    .HasColumnName("NAME");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("PRODUCTS");

                entity.Property(e => e.Id)
                    .HasColumnType("INT IDENTITY")
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.Idcategory)
                    .HasColumnType("INT")
                    .HasColumnName("IDCATEGORY");

                entity.Property(e => e.ImageUrl)
                    .HasColumnType("NVARCHAR")
                    .HasColumnName("IMAGE_URL");

                entity.Property(e => e.Name)
                    .HasColumnType("NVARCHAR(255)")
                    .HasColumnName("NAME");

                entity.Property(e => e.Price)
                    .HasColumnType("FLOAT")
                    .HasColumnName("PRICE")
                    .HasDefaultValueSql("0");

                entity.HasOne(d => d.IdcategoryNavigation)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.Idcategory)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("ROLES");

                entity.Property(e => e.Id)
                    .HasColumnType("INT IDENTITY")
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.Name)
                    .HasColumnType("NVARCHAR(100)")
                    .HasColumnName("NAME");
            });

            modelBuilder.Entity<Staff>(entity =>
            {
                entity.ToTable("STAFFS");

                entity.Property(e => e.Id)
                    .HasColumnType("INT IDENTITY")
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.Address)
                    .HasColumnType("NVARCHAR")
                    .HasColumnName("ADDRESS");

                entity.Property(e => e.Birthday)
                    .HasColumnType("DATETIME")
                    .HasColumnName("BIRTHDAY");

                entity.Property(e => e.Code)
                    .HasColumnType("VARCHAR(15)")
                    .HasColumnName("CODE");

                entity.Property(e => e.Idrole)
                    .HasColumnType("INT")
                    .HasColumnName("IDROLE");

                entity.Property(e => e.Name)
                    .HasColumnType("NVARCHAR(100)")
                    .HasColumnName("NAME");

                entity.Property(e => e.Phone)
                    .HasColumnType("VARCHAR(15)")
                    .HasColumnName("PHONE");

                entity.Property(e => e.Sex)
                    .HasColumnType("NVARCHAR(20)")
                    .HasColumnName("SEX");

                entity.HasOne(d => d.IdroleNavigation)
                    .WithMany(p => p.staff)
                    .HasForeignKey(d => d.Idrole)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<Staffaccount>(entity =>
            {
                entity.ToTable("STAFFACCOUNTS");

                entity.Property(e => e.Id)
                    .HasColumnType("INT")
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.Password)
                    .HasColumnType("NVARCHAR")
                    .HasColumnName("PASSWORD");

                entity.Property(e => e.Username)
                    .HasColumnType("VARCHAR(100)")
                    .HasColumnName("USERNAME");

                entity.HasOne(d => d.IdNavigation)
                    .WithOne(p => p.Staffaccount)
                    .HasForeignKey<Staffaccount>(d => d.Id)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<Table>(entity =>
            {
                entity.ToTable("TABLES");

                entity.Property(e => e.Id)
                    .HasColumnType("INT IDENTITY")
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.Idstate)
                    .HasColumnType("INT")
                    .HasColumnName("IDSTATE");

                entity.Property(e => e.Name)
                    .HasColumnType("NVARCHAR(15)")
                    .HasColumnName("NAME");

                entity.HasOne(d => d.IdstateNavigation)
                    .WithMany(p => p.Tables)
                    .HasForeignKey(d => d.Idstate);
            });

            modelBuilder.Entity<Tablestate>(entity =>
            {
                entity.ToTable("TABLESTATES");

                entity.Property(e => e.Id)
                    .HasColumnType("INT IDENTITY")
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.Name)
                    .HasColumnType("NVARCHAR(100)")
                    .HasColumnName("NAME");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
