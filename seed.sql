

-- drop table inventory cascade    ;
-- drop table stock cascade        ;
-- drop table accounting cascade   ;



create table if not exists inventory (
    "InventoryID"     serial primary key          ,
    "Name"            varchar(200)                ,
    "Description"     varchar(200)
);

create table if not exists stock (
    "StockID"             serial primary key                                          ,
    "InventoryID"         int references inventory("InventoryID") on delete cascade  ,
    "TotalAm"             smallint                                                    ,
    "AmInStock"           smallint
);

create table if not exists price_list (
    "PListID"             serial primary key                                          ,
    "InventoryID"         int references inventory("InventoryID") on delete cascade  ,
    "UnitPrice"           smallint
);

create table if not exists accounting (
    "AccID"               serial primary key                                           ,
    "InventoryID"        int references inventory("InventoryID") on delete cascade    ,
    "AmRented"           smallint                                                      ,
    "RentTime"           smallint                                                      ,
    "StartTime"          timestamp                                                     ,
    "EndTime"            timestamp                                                     ,
    "Price"              smallint                                                      ,
    "RenterName"         varchar(200)                                                  ,
    "RenterSurname"      varchar(200)                                                  ,
    "RenterPhone"        varchar(200)                                                  ,
    "RenterCardDet"      varchar(200)
);

insert into  inventory("Name", "Description")
 values ('Mountain Bike', 'Badass bike'),
        ('Chair', 'Lovely chair'),
        ('Table', 'Your best buddy'),
        ('Tent', 'Zzzzzzzzzz');


insert into stock("InventoryID", "TotalAm", "AmInStock")
values ((select s."InventoryID" from inventory s where s."Name" = 'Mountain Bike'), 5, 4),
       ((select s."InventoryID" from inventory s where s."Name" = 'Chair'), 15, 13),
       ((select s."InventoryID" from inventory s where s."Name" = 'Table'), 10, 8),
       ((select s."InventoryID" from inventory s where s."Name" = 'Tent'), 5, 3);

insert into price_list("InventoryID", "UnitPrice")
values ((select s."InventoryID" from inventory s where s."Name" = 'Mountain Bike'), 100),
       ((select s."InventoryID" from inventory s where s."Name" = 'Chair'), 10),
       ((select s."InventoryID" from inventory s where s."Name" = 'Table'), 10),
       ((select s."InventoryID" from inventory s where s."Name" = 'Tent'), 200);

insert into accounting("InventoryID", "AmRented", "RentTime", "StartTime", "EndTime",
                       "Price", "RenterName", "RenterSurname", "RenterPhone", "RenterCardDet")
values ((select s."InventoryID" from inventory s where s."Name" = 'Mountain Bike'), 1, 24, current_date, 'infinity', 100,
        'Alex', 'Alex', '+380985678765', '5168 1241 5353 1516');
