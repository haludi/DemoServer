﻿using System;
using Raven.Client.FileSystem;

namespace DemoMethods
{
    public static class FileStoreHolder
    {
        private static readonly Lazy<IFilesStore> FsStore = new Lazy<IFilesStore>(CreateStore);

        public static IFilesStore FilesSystemStore
        {
            get { return FsStore.Value; }
        }

        private static IFilesStore CreateStore()
        {
            var filesStore = new FilesStore()
            {
                // Url = DocumentStoreHolder.ConnectionStringName,
                Url = DemoUtilities.ServerInfo,
                DefaultFileSystem = DocumentStoreHolder.NorthwindDatabaseName + "FS"
            }.Initialize();

            return filesStore;
        }
    }
}
